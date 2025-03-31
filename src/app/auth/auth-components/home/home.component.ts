import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./normalize.scss', './home.component.scss']  // Usamos 'styleUrls' y un arreglo de rutas
})

export class HomeComponent implements OnInit {

  ngOnInit(): void {
    // Lógica para el menú
    const openButton = document.querySelector('.nav__menu');
    const menu = document.querySelector('.nav__link');
    const closeMenu = document.querySelector('.nav__close');

    openButton?.addEventListener('click', () => {
      menu?.classList.add('nav__link--show');
    });

    closeMenu?.addEventListener('click', () => {
      menu?.classList.remove('nav__link--show');
    });

    // Lógica para las preguntas del FAQ
    const titleQuestions = Array.from(document.querySelectorAll('.questions__title'));
    console.log(titleQuestions);

    titleQuestions.forEach(question => {
      question.addEventListener('click', () => {
        let height = 0;
        let answer = question.nextElementSibling as HTMLElement; // Aseguramos que 'answer' es de tipo HTMLElement
        let addPadding = question.parentElement?.parentElement;

        addPadding?.classList.toggle('questions__padding--add');
        question.children[0]?.classList.toggle('questions__arrow--rotate');

        if (answer.clientHeight === 0) {
          height = answer.scrollHeight;
        }

        answer.style.height = `${height}px`;
      });
    });

    // Lógica del slider de testimonios
    const sliders = Array.from(document.querySelectorAll('.testimony__body'));
    const buttonNext = document.querySelector('#next');
    const buttonBefore = document.querySelector('#before');
    let value: number;

    buttonNext?.addEventListener('click', () => {
      changePosition(1);
    });

    buttonBefore?.addEventListener('click', () => {
      changePosition(-1);
    });

    const changePosition = (add: number) => {
      const currentTestimony = (document.querySelector('.testimony__body--show') as HTMLElement)?.dataset["id"]; // Usamos notación de corchetes
      if (currentTestimony) {
        value = Number(currentTestimony);
        value += add;

        sliders[Number(currentTestimony) - 1].classList.remove('testimony__body--show');
        if (value === sliders.length + 1 || value === 0) {
          value = value === 0 ? sliders.length : 1;
        }

        sliders[value - 1].classList.add('testimony__body--show');
      }
    };
  }

}
