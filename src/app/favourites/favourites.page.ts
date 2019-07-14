import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Product } from '../stores/product-store/product.model';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {

  products: any
  userId: string
  
  constructor(
    private db: AngularFirestore,
    public afAuth: AngularFireAuth,
  ) {
    this.afAuth.user.subscribe(user => {
        this.userId = user.uid
        
        this.products = this.db.collection<any>('users').doc(user.uid).collection('favorites').snapshotChanges().pipe(
          map(products => products.map(product => {
            const data = product.payload.doc.data() as Product[];
            const id = product.payload.doc.id;
            return { ...data, id  };
          }))
          )
      })
    }

  ngOnInit() {
  }

  removeFromFavourites(product: Product) {
    this.db.collection<any>('users').doc(this.userId).collection('favorites').doc(product.id).delete()
  }
}
