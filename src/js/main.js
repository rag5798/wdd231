import { getParkData } from "./parkService.mjs";

const parkData = getParkData();

const parkInfoLinks = [
    {
      name: "Current Conditions &#x203A;",
      link: "conditions.html",
      image: parkData.images[2].url,
      description:
        "See what conditions to expect in the park before leaving on your trip!"
    },
    {
      name: "Fees and Passes &#x203A;",
      link: "fees.html",
      image: parkData.images[3].url,
      description: "Learn about the fees and passes that are available."
    },
    {
      name: "Visitor Centers &#x203A;",
      link: "visitor_centers.html",
      image: parkData.images[9].url,
      description: "Learn about the visitor centers in the park."
    }
];

function parkInfoTemplate(data){
    const banner_holder = document.createElement('div');
    const text_holder = document.createElement('div');
    const name = document.createElement('h1');
    const park_type = document.createElement('p');
    const states = document.createElement('p');
    const split_name = data.fullName.split(' ');

    name.innerHTML = split_name[0]
    park_type.innerHTML = split_name[1] + ' ' + split_name[2];
    states.innerHTML = data.states

    banner_holder.id = 'bannertext';
    banner_holder.appendChild(name);
    text_holder.appendChild(park_type);
    text_holder.appendChild(states);
    banner_holder.appendChild(text_holder)

    return banner_holder
}


function setHeaderInfo(data) {
    // insert data into disclaimer section
    const sections = document.querySelectorAll('main > section');
    const disclaimer = document.querySelector(".disclaimer > a");
    disclaimer.href = data.url;
    disclaimer.innerHTML = data.fullName;
    // update the title of the site. Notice that we can select things in the head just like in the body with querySelector
    document.querySelector("head > title").textContent = data.fullName;
    // set the banner image
    document.querySelector("#banner").backgroundImage = data.images[0].url;
    // use the template function above to set the rest of the park specific info in the header
    document.querySelector("#bannertext").replaceWith(parkInfoTemplate(data))

    sections[0].textContent = `${data.fullName}`;
    sections[1].textContent = `${data.description}`
}

setHeaderInfo(parkData);

function mediaCardTemplate(templateData){
    const link_section = document.querySelector('.link_section');
    const section = document.createElement('section');
    const img = document.createElement('img');
    const h1 = document.createElement('h1');
    const p = document.createElement('p');

    img.src = templateData.image;
    h1.innerHTML = templateData.name;
    p.innerHTML = templateData.description;

    section.appendChild(img);
    section.appendChild(h1);
    section.appendChild(p);
    section.classList.add('links')

    link_section.appendChild(section);
}

parkInfoLinks.forEach((element) => mediaCardTemplate(element));