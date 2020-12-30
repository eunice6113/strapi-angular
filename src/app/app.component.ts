import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import axios from 'axios';
import {Book} from './core/models/book';
import {FormBuilder, Validators} from '@angular/forms';
import {convertToParamMap} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit, OnDestroy {
    url = 'http://localhost:1337';
    bookUrl = this.url + '/books';

    error = null;

    modifiedData;

    books:Book[] = [];

    myFormData: any;

    constructor(
        private formBuilder: FormBuilder,
        private cd: ChangeDetectorRef
    ) {

        this.modifiedData = this.formBuilder.group({
            title:'',
            description:'',
            author:'',
            cover:{},
        })
    }

    ngOnInit() {
        this.getBooks();
    }

    ngOnDestroy(): void {
    }

    async getBooks() {

        try {
            const response = await axios.get(this.bookUrl);
            this.books = response.data;

            this.books.reverse();
            console.log(this.books)

        } catch (e) {

            this.error = e;
        }

    }

    async onSubmit( bookData:any ) {

        console.log('bookData', bookData)

        // bookData.cover = this.file;
        // bookData.cover = this.myFormData;

        try {
            const response = await axios.post(
                this.bookUrl,
                bookData
            ).then( res => {
                this.getBooks();
            });
            console.log('response', response);
        } catch (e) {
            this.error = e;
        }
        this.modifiedData.reset();
    }



    file:any;

    public registerBookCover( e:any ) {


        // if (e.target.files && e.target.files.length) {
        //     this.file = e.target.files[0];
        // }
        //
        // const myFormValue = this.modifiedData.value;
        //
        // console.log(myFormValue)
        // console.log(myFormValue.cover)
        //
        // this.myFormData = new FormData();
        //
        // this.modifiedData.value.append('cover', this.file, this.file.name)
        //
        // this.modifiedData.value.cover = this.file;
        //
        // console.log( this.modifiedData.value.cover);
        //
        //
        // for ( let i = 0; i < myFormValue.length; ++i ) {
        //     for ( let key of myFormValue ) {
        //         // this.myFormData.append(key, myFormValue[key]);
        //
        //         console.log('key', key);
        //         console.log('myFormValue[key]', myFormValue[key]);
        //
        //         this.myFormData.append('cover', this.file, this.file.name);
        //         // this.myFormData.append(`files.${currentElement.name}`, file, file.name);
        //     }
        // }
        //





        // const reader = new FileReader();
        //
        // if (e.target.files && e.target.files.length) {
        //     const [file] = e.target.files;
        //     reader.readAsDataURL(file);
        //
        //     reader.onload = () => {
        //         this.modifiedData.patchValue({
        //             cover: reader.result
        //         });
        //
        //         // need to run CD since file load runs outside of zone
        //         this.cd.markForCheck();
        //     };
        // }
    }
}
