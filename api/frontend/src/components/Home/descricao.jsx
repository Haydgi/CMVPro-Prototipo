import React, { Fragment } from 'react';
import styles from './descricao.module.css';
import ChefAnimado from '/midia/chef_animado.png';

const PassoAPasso = (props) => {
  return (
    <div className={`passo-a-passo-container1 thq-section-padding ${props.rootClassName}`}>
      <div className="passo-a-passo-max-width thq-section-max-width">
          <div className={styles.textotopo} id='descricao'>
            <h2>O que é o Caderno do Chef?</h2>
            <p>
              O Caderno do Chef é um sistema inovador desenvolvido por uma equipe de estudantes, com o objetivo de transformar a forma como empreendedores do setor gastronômico realizam a precificação de suas receitas.
            </p>
         
            <p>
              A proposta nasceu da identificação das principais dores e desafios enfrentados por chefs, donos de restaurantes, confeiteiros e outros profissionais da gastronomia, especialmente no que diz respeito ao equilíbrio entre custos, margem de lucro e competitividade no mercado.
            </p>

            <p>
              Nosso sistema oferece uma solução prática, eficiente e intuitiva, que auxilia na tomada de decisões estratégicas, proporcionando maior segurança e precisão na definição de preços. Com ele, é possível realizar cálculos automáticos, analisar e selecionar a quantidade de cada ingrediente na receita e otimizar a precificação e a gestão financeira do negócio. Além de ser uma ferramenta de apoio técnico, o Caderno do Chef também busca fomentar uma cultura de profissionalização no setor gastronômico, contribuindo para o fortalecimento e crescimento sustentável dos empreendimentos.
            </p>

            <p>
              Este projeto representa não apenas uma solução tecnológica, mas também um compromisso social com a valorização e o desenvolvimento dos pequenos e médios negócios gastronômicos.
            </p>
          </div>

          <div className={styles.imagemchef}>
            <img src={ChefAnimado} 
            alt="Imagem de um Chef animado com a sua ideia."
            className={styles.imagem} />
          </div>
            </div>
          </div>
  );
};

PassoAPasso.defaultProps = {
  step1Description: undefined,
  step3Description: undefined,
  step2Title: undefined,
  step2Description: undefined,
  step1Title: undefined,
  step3Title: undefined,
  step4Description: undefined,
  step4Title: undefined,
  rootClassName: '',
  imageSrc: 'https://play.teleporthq.io/static/svg/default-img.svg',
  imageAlt: 'image',
};

export default PassoAPasso;
