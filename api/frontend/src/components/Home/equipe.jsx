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
                  <span className="equipe-text30" id='equipe'>Conheça nossa Equipe</span>
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
                    chefs a gerenciarem seus negócios de forma mais eficiente.
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
                      Andress Mota
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
                    Desenvolvedor fullstack focado em criação de soluções. Conhecimento em HTML, CSS, React, Node.js, Java, JavaScript e MySQL. Experiência com aplicações web escaláveis e seguras.                  </span>
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
                    Database Developer com experiência na integração entre front-end e banco de dados, utilizando React, Node.js e MySQL. Atuei na modelagem de dados, criação de rotas e consumo de APIs existentes. Tenho como foco o desenvolvimento de sistemas bem estruturados, com alto desempenho e preparados para evoluir conforme as demandas do projeto.                  </span>
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
                    Desenvolvedor Fullstack com alta adaptabilidade e foco em eficiência. Atuou em todas as etapas do desenvolvimento do Caderno do Chef, com ênfase na identificação e solução de problemas. Possui sólida experiência em JavaScript, Java, Python e C, além de domínio na utilização da biblioteca React com Vite e no gerenciamento de dados com MySQL.
                  </span>
                </div>
              </div>
              <div className="equipe-card4">
                <img
                  alt="Joao Portes"
                  src="/midia/joao.png"
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
                      Desenvolvedor Front-end focado em criar interfaces modernas, performáticas e centradas no usuário. Atuação com React e Tailwind CSS, aplicando microinterações, responsividade e boas práticas de UI/UX. Conhecimento em Node.js e MySQL para integração eficiente e visão completa do produto.                  </span>
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
                    Desenvolvedor Fullstack com foco em performance, usabilidade e experiência do usuário. Crio soluções escaláveis com React e Java, integrando bancos de dados MySQL e NoSQL. Tenho como prioridade criar interfaces modernas e fáceis de usar, sempre pensando na experiência do usuário e nas reais necessidades do negócio.
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