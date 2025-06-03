import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc } from '@angular/fire/firestore';
import { collectionData, docData } from 'rxfire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: Firestore) { }

  // Add document to a collection
  async addDoc(collectionName: string, data: any): Promise<void> {
    const collRef = collection(this.firestore, collectionName);
    await addDoc(collRef, data);
  }

  // Get a document by ID
  getDoc(collectionName: string, id: string): Observable<any> {
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    return docData(docRef, { idField: 'id' });
  }

  // Get all documents in a collection
  getAllDocs(collectionName: string): Observable<any[]> {
    const collRef = collection(this.firestore, collectionName);
    return collectionData(collRef, { idField: 'id' });
  }
}
