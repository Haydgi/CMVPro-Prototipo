import React, { Fragment } from 'react';
import { ImGithub } from "react-icons/im";
import { FaLinkedin } from "react-icons/fa";


import './equipe.css';

const Equipe = (props) => {
  return (
    <div className="thq-section-padding">
      <div className="equipe-max-width thq-section-max-width">
        <div className="equipe-section-title">
          <div className="equipe-content1">
            <h2 className="thq-heading-2 equipe-text12">
              {props.heading1 ?? (
                <Fragment>
                  <span className="equipe-text30" id='equipe'>Conheça nossa equipe</span>
                </Fragment>
              )}
            </h2>
            <p className="equipe-text13 thq-body-large">
              {props.content2 ?? (
                <Fragment>
                  <span className="equipe-text40">
                    Esse projeto foi desenvolvido por uma equipe de estudantes do curso de Análise
                    e Desenvolvimento de Sistemas da Faculdade de Tecnologia de Guaratinguetá (FATEC GTA).
                    <br/>Cada membro trouxe suas habilidades únicas para criar uma solução inovadora que ajuda
                    chefs a gerenciar seus negócios de forma mais eficiente.
                  </span>
                </Fragment>
              )}
            </p>
          </div>
        </div>
        <div className="equipe-content2">
          <div className="equipe-row1">
            <div className="equipe-container1">
              <div className="equipe-card1">
                <img
                  alt="Andress Mota"
                  src="/midia/andress.png"
                  className="equipe-placeholder-image thq-img-round "
                />
                <div className="equipe-content3">
                  <div className="equipe-title1">
                    <span className="equipe-text14 thq-body-small">
                      Andress, O nosso herói cabeludo
                    </span>
                    <span className="equipe-text15 thq-body-small">
                      Desenvolvedor Back-end
                    </span>
                    <div className="link-container">
                      <a href="https://github.com/Andress-Mota" className="link-styles1"><ImGithub />Github</a>
                      <a href="https://www.linkedin.com/in/andress-mota-522020325/" className="link-styles2"><FaLinkedin />Linkedin</a>
                    </div>
                  </div>
                  <span className="equipe-text25">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, excepturi. Laborum tempora, voluptate est quas placeat error neque nostrum voluptates?
                  </span>
                </div>
              </div>
              <div className="equipe-card2">
                <img
                  alt="Bruno de Freitas"
                  src="/midia/brunao.png"
                  className="equipe-placeholder-image thq-img-round "
                />
                <div className="equipe-content4">
                  <div className="equipe-title2">
                    <span className="equipe-text17 thq-body-small">
                      Bruno de Freitas
                    </span>
                    <span className="equipe-text18 thq-body-small">
                      Desenvolvedor Back-end
                    </span>
                    <div className="link-container">
                      <a href="https://github.com/amatoshdev" className="link-styles1"><ImGithub />Github</a>
                      <a href="https://www.linkedin.com/in/bruno-freitas-7a5902288/" className="link-styles2"><FaLinkedin />Linkedin</a>
                    </div>
                  </div>
                  <span className="equipe-text25">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, quam. Exercitationem dolorum esse eius, rerum assumenda laudantium asperiores nulla eum?
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="equipe-row2">
            <div className="equipe-container2">
              <div className="equipe-card3">
                <img
                  alt="Haydgi Resende"
                  src="/midia/haydgi.png"
                  className="equipe-placeholder-image thq-img-round"
                />
                <div className="equipe-content5">
                  <div className="equipe-title3">
                    <span className="equipe-text20 thq-body-small">
                      Haydgi Resende
                    </span>
                    <span className="equipe-text21 thq-body-small">
                      Desenvolvedor Front-end
                    </span>
                    <div className="link-container">
                      <a href="https://github.com/Haydgi" className="link-styles1"><ImGithub />Github</a>
                      <a href="https://www.linkedin.com/in/haydgi-resende-217594237/" className="link-styles2"><FaLinkedin />Linkedin</a>
                    </div>
                  </div>
                  <span className="equipe-text25">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam quas saepe cum voluptas culpa aliquid eligendi facere et. Illum, distinctio?
                  </span>
                </div>
              </div>
              <div className="equipe-card4">
                <img
                  alt="Joao Portes"
                  src="/midia/joaoo.png"
                  className="equipe-placeholder-image thq-img-round "
                />
                <div className="equipe-content6">
                  <div className="equipe-title4">
                    <span className="equipe-text23 thq-body-small">
                      João Portes
                    </span>
                    <span className="equipe-text24 thq-body-small">
                      Desenvolvedor Front-end
                    </span>
                    <div className="link-container">
                      <a href="https://github.com/JoaoLuisPortes" className="link-styles1"><ImGithub />Github</a>
                      <a href="https://www.linkedin.com/in/joao-portes/" className="link-styles2"><FaLinkedin />Linkedin</a>
                    </div>
                  </div>
                  <span className="equipe-text25">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto ullam maxime nesciunt debitis. Possimus, minus excepturi. Quo nulla maiores voluptatum.
                  </span>
                </div>
              </div>
              <div className="equipe-card5">
                <img
                  alt="Victor"
                  src="/midia/victor.png"
                  className="equipe-placeholder-image thq-img-round "
                />
                <div className="equipe-content6">
                  <div className="equipe-title4">
                    <span className="equipe-text23 thq-body-small">
                      Victor Amato
                    </span>
                    <span className="equipe-text24 thq-body-small">
                      Desenvolvedor Front-end
                    </span>
                    <div className="link-container">
                      <a href="https://github.com/amatoshdev" className="link-styles1"><ImGithub />Github</a>
                      <a href="https://www.linkedin.com/in/amatosh/" className="link-styles2"><FaLinkedin />Linkedin</a>
                    </div>
                  </div>
                  <span className="equipe-text25">
                    Especialista em desenvolvimento front-end com foco em performance, usabilidade e consistência visual. Entrego soluções que equilibram forma e função.
                  </span>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Equipe;