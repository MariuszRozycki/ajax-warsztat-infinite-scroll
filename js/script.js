let preloading = false;

const showPreloader = () => {
  let preloader = document.getElementsByClassName('loading')[0];
  console.log(preloader);
  preloader.style.display = "block";
  preloading = true;
}

const hidePreloader = () => {
  let preloader = document.getElementsByClassName('loading')[0];
  console.log(preloader);
  preloader.style.display = "none";
  preloading = false;
}

const getData = () => {

  if (!preloading) {
    showPreloader();



    fetch('https://akademia108.pl/api/ajax/get-users.php', {
      mode: 'cors',
      method: 'GET',
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data);

        let hr = document.createElement('hr');
        document.body.appendChild(hr);

        for (let person of data) {

          let id = document.createElement('p');
          let name = document.createElement('p');
          let web = document.createElement('p');
          let line = document.createElement('p')

          id.innerText = 'New User ID: ' + person.id;
          name.innerText = 'New User Name: ' + person.name;
          web.innerText = 'New User URL: ' + person.web;
          line.innerText = '--------';

          id.setAttribute('class', 'new');
          name.setAttribute('class', 'new');
          web.setAttribute('class', 'new');

          console.log('ID: ' + person.id);
          console.log('Name: ' + person.name);
          console.log('Website: ' + person.website);

          document.body.appendChild(id);
          document.body.appendChild(name);
          document.body.appendChild(web);
          document.body.appendChild(line);
        }

        hidePreloader();
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }
}

const scrollToEndOfPage = () => {

  let scrollTop = Math.ceil(document.documentElement.scrollTop);
  console.log('scrollTop', scrollTop);

  let clientHeight = Math.ceil(document.documentElement.clientHeight);
  console.log('clientHeight', clientHeight);

  let scrollHeight = document.documentElement.scrollHeight;
  console.log('scrollHeight', scrollHeight);

  if (scrollTop + clientHeight >= scrollHeight) {
    console.log('Get data from API');
    console.log('--------------------------------');


    getData();

  }

}
window.addEventListener('scroll', scrollToEndOfPage);