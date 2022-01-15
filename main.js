const url = "https://jsonplaceholder.typicode.com/albums";
const urlPhotos = "https://jsonplaceholder.typicode.com/photos?albumId=";
const albums = document.querySelector(".albums");
const images = document.querySelector(".img");

async function getGallery() {
  let respons = await fetch(url);

  if (respons.ok) {
    return await respons.json();
  } else {
    console.error("Error");
  }
}

async function getImg(id) {
  let respons = await fetch(`${urlPhotos + id}`);

  if (respons.ok) {
    return await respons.json();
  } else {
    console.error("Error");
  }
}

let gallery = (gallery) => {
  gallery.map((item) => {
    return albums.innerHTML += `<li data-id = ${item.id}>${item.title}</li>`;
  });
};

let renderImg = (imgArr) => {
  images.innerHTML = imgArr
    .map((img) => {
      let imgUrl = img.url;
      return `<img src=${imgUrl}>`;
    })
    .join(" ");
};

getGallery().then((data) => gallery(data));
getImg(1).then((img) => renderImg(img));

albums.addEventListener("click", (e) => {
  let target = e.target;
  let targetId = target.attributes[0].nodeValue;

  getImg(targetId).then((img) => renderImg(img));
});
