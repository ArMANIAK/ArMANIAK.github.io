const createElement = (tag, className) => {
    let element = document.createElement(tag);
    element.className = className;
    return element;
}

const stringToDate = string => {
    let sum = 0;
    for (let i = 0, n = string.length; i < n; i++) {
        sum += string.charCodeAt(i);
    }
    return new Date(sum * 100000);
}

const createPost = post => {
    let section = createElement('section', 'post');
    let postHeading = createElement('div', 'post-heading');
    let avatar = createElement('img', 'avatar');
    avatar.src = post.url;
    let time = createElement('p', 'time');
    time.innerText = stringToDate(post.title);
    let name = createElement('p', 'name');
    name.innerText = post.name;
    postHeading.append(avatar, time, name);
    let postBody = createElement('div', 'post-body');
    postBody.innerText = post.body;
    section.append(postHeading, postBody);
    document.body.append(section);
}

const getData = (type) => {
    let url = 'https://jsonplaceholder.typicode.com/';
    let info = []
    return new Promise(resolve => {
        fetch(url + type)
        .then(data => data.json())
        .then(array => {
            info = array;
            resolve(info);
        })  
    })
}

const getPosts = () => {
    let startTime = new Date();
    let postsPromise = getData('posts');
    let authorsPromise = getData('users');
    let imagesPromise = getData('photos');
    let posts, authors, images;
    postsPromise.then(data => posts = data);
    authorsPromise.then(data => authors = data);
    imagesPromise.then(data => images = data);
    Promise.all([postsPromise, authorsPromise, imagesPromise]).then(() => {
        for (let post of posts) {
            let author = authors[authors.findIndex(el => el.id == post.userId)];
            let image = images[images.findIndex(el => el.id == author.id)];
            let resultPost = {
                name: author.name,
                url: image.url,
                title: post.title,
                body: post.body
            }
            createPost(resultPost);
        }
      let finishTime = new Date();
      console.log(finishTime - startTime);
    }, err => new Error(err));
}

let button = document.querySelector('button');
button.addEventListener('click', getPosts);