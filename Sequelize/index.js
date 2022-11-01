const db = require("./connection/database")
const fs = require('fs');

const Category = require("./models/category");
const Author = require("./models/author");
const Book = require("./models/book"); 
const BookCategory = require("./models/book_categories");
const BookAuthor = require("./models/book_author");
// db.sync({force:true})

let rawdata = fs.readFileSync('books_data.json');
let books = JSON.parse(rawdata);

let books_data = []
books.forEach(element => {
    let book_data = {}
    if(element.title != undefined){
        book_data.title = element.title
    }
    if(element.isbn != undefined){
        book_data.isbn = element.isbn
    }
    if(element.pageCount!= undefined){
        book_data.page_count = element.pageCount
    }
    if(element.publishedDate != undefined){
        book_data.published_date = element.publishedDate.date
    }
    if(element.thumbnailUrl != undefined){
        book_data.thumnbnail_URL = element.thumbnailUrl
    }
    if(element.shortDescription != undefined){
        book_data.short_description = element.shortDescription
    }
    if(element.longDescription != undefined){
        book_data.long_description = element.longDescription
    }
    if(element.status != undefined){
        book_data.status = element.status
    }
    if(element.authors != undefined){
        book_data.authors = element.authors
    }
    if(element.categories != undefined){
        book_data.categories = element.categories
    }
    books_data.push(book_data)
});
async function create(data){
    for(let i of data){
        let book_datas = Array.prototype.slice.call(i, 0,0)
        delete book_datas.authors
        delete book_datas.categories
        let book = await Book.findOrCreate({where:{title:i.title},defaults:book_datas})
        for(let j of i.authors){
            let last_name = j.split(' ').slice(-1).join(' ');
            var name = j.split(' ').slice(0, -1).join(' ');
            let author = await Author.findOrCreate({where:{name:name},defaults:{name:name,last_name:last_name}})
            BookAuthor.findOrCreate({where:{id_book:book[0].dataValues.id, id_author:author[0].dataValues.id},defaults:{id_book:book[0].dataValues.id, id_author:author[0].dataValues.id}})
        }
        for(let j of i.categories){
            let category = await Category.findOrCreate({where:{name:j},defaults:{name:j}})
            BookCategory.findOrCreate({where:{id_book:book[0].dataValues.id, id_category:category[0].dataValues.id},defaults:{id_book:book[0].dataValues.id, id_category:category[0].dataValues.id}})

        }
    }
}
create(books_data)