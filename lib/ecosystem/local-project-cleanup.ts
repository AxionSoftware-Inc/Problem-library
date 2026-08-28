import { listLocalScientificObjects } from "./local-object-store";

const DB_NAME = "axion-science-local-v1";
const DB_VERSION = 1;
const OBJECTS_STORE = "objects";
const REVISIONS_STORE = "revisions";
const REFERENCES_STORE = "references";

function transactionDone(transaction: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onabort = () => reject(transaction.error || new Error("INDEXEDDB_TRANSACTION_ABORTED"));
    transaction.onerror = () => reject(transaction.error || new Error("INDEXEDDB_TRANSACTION_FAILED"));
  });
}

async function openExistingDatabase() {
  await listLocalScientificObjects("__schema_probe__");
  return await new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("INDEXEDDB_OPEN_FAILED"));
  });
}

export async function deleteLocalScientificDataForProject(projectId: string) {
  if (typeof indexedDB === "undefined") return;

  const db = await openExistingDatabase();
  const transaction = db.transaction([OBJECTS_STORE, REVISIONS_STORE, REFERENCES_STORE], "readwrite");
  const objectStore = transaction.objectStore(OBJECTS_STORE);
  const revisionStore = transaction.objectStore(REVISIONS_STORE);
  const referenceStore = transaction.objectStore(REFERENCES_STORE);
  const revisionIndex = revisionStore.index("byObject");

  const objectCursorRequest = objectStore.index("byProject").openCursor(IDBKeyRange.only(projectId));
  objectCursorRequest.onsuccess = () => {
    const cursor = objectCursorRequest.result;
    if (!cursor) return;

    const objectId = String(cursor.primaryKey);
    const revisionCursorRequest = revisionIndex.openCursor(IDBKeyRange.only(objectId));
    revisionCursorRequest.onsuccess = () => {
      const revisionCursor = revisionCursorRequest.result;
      if (!revisionCursor) return;
      revisionCursor.delete();
      revisionCursor.continue();
    };

    cursor.delete();
    cursor.continue();
  };

  const referenceCursorRequest = referenceStore.index("byProject").openCursor(IDBKeyRange.only(projectId));
  referenceCursorRequest.onsuccess = () => {
    const cursor = referenceCursorRequest.result;
    if (!cursor) return;
    cursor.delete();
    cursor.continue();
  };

  await transactionDone(transaction);
  db.close();
}
