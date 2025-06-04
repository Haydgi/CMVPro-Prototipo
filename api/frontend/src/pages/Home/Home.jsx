import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import Navbar from '../../components/Home/navbar'; // Corrigido o caminho
import Resumo from '../../components/Home/resumo'; // Corrigido o caminho
import PassoAPasso from '../../components/Home/passo-a-passo'; // Corrigido o caminho
import ContainerInfos from '../../components/Home/container-infos'; // Corrigido o caminho
import SugestaoCadastro from '../../components/Home/sugestao-cadastro'; // Corrigido o caminho
import Equipe from '../../components/Home/equipe'; // Corrigido o caminho
import Footer from '../../components/Home/footer'; // Corrigido o caminho
import './Home.css'; // Usando estilos globais

const Home = (props) => {
  return (
    <div className="home-container">
      <Helmet>
        <title>Caderno do Chef</title>
        <meta property="og:title" content="Fatherly Superficial Shark" />
      </Helmet>
      <Navbar></Navbar>
      <Resumo
        feature3Description={
          <Fragment>
            <span className="home-text24">
              Discover new cooking techniques and skills
            </span>
          </Fragment>
        }
        feature3Title={
          <Fragment>
            <span className="home-text25">Cooking Tips &amp; Tricks</span>
          </Fragment>
        }
        feature2Description={
          <Fragment>
            <span className="home-text26">
              Step-by-step guides for perfect dishes
            </span>
          </Fragment>
        }
        feature1Title={
          <Fragment>
            <span className="home-text27">Inspiring Recipes</span>
          </Fragment>
        }
        feature1Description={
          <Fragment>
            <span className="home-text28">
              Explore a variety of mouth-watering recipes
            </span>
          </Fragment>
        }
        feature2Title={
          <Fragment>
            <span className="home-text29">Guided Cooking Instructions</span>
          </Fragment>
        }
      ></Resumo>
      <PassoAPasso
        step1Description={
          <Fragment>
            <span className="home-text30">
              Faça suas compras normalmente e tire um tempinho do seu dia para dizer quanto você pagou em cada item
            </span>
          </Fragment>
        }
        step3Description={
          <Fragment>
            <span className="home-text31">
              Insira outras despesas do seu restaurante e também quanto deseja lucrar com o prato
            </span>
          </Fragment>
        }
        step2Title={
          <Fragment>
            <span className="home-text32">Cadastre suas receitas</span>
          </Fragment>
        }
        step2Description={
          <Fragment>
            <span className="home-text33">
              Conte quais ingredientes você usa e suas quantidades para que o sistema possa calcular os gastos
            </span>
          </Fragment>
        }
        step1Title={
          <Fragment>
            <span className="home-text34">Cadastre os ingredientes</span>
          </Fragment>
        }
        step3Title={
          <Fragment>
            <span className="home-text35">Toques finais</span>
          </Fragment>
        }
        step4Description={
          <Fragment>
            <span className="home-text36">
              O Caderno Do Chef vai informar quanto você gasta para fazer uma receita e vai sugerir um preço para obter lucro!
            </span>
          </Fragment>
        }
        step4Title={
          <Fragment>
            <span className="home-text37">Aproveite!</span>
          </Fragment>
        }
        rootClassName="passo-a-passoroot-class-name"
      ></PassoAPasso>
      <ContainerInfos
        feature3Description={
          <Fragment>
            <span className="home-text38">
              Read insightful articles on food trends, ingredients, and culinary inspiration.
            </span>
          </Fragment>
        }
        feature1Description={
          <Fragment>
            <span className="home-text39">
              Explore a wide range of mouth-watering recipes from appetizers to desserts.
            </span>
          </Fragment>
        }
        feature2Title={
          <Fragment>
            <span className="home-text40">Helpful Cooking Tips</span>
          </Fragment>
        }
        feature1Title={
          <Fragment>
            <span className="home-text41">Delicious Recipes</span>
          </Fragment>
        }
        feature2Description={
          <Fragment>
            <span className="home-text42">
              Discover useful tips and tricks to enhance your cooking skills and techniques.
            </span>
          </Fragment>
        }
        feature3Title={
          <Fragment>
            <span className="home-text43">Informative Articles</span>
          </Fragment>
        }
      ></ContainerInfos>
      <SugestaoCadastro
        heading1={
          <Fragment>
            <span className="home-text56">Pronto para cozinhar?</span>
          </Fragment>
        }
        content1={
          <Fragment>
            <span className="home-text57">
              Se cadastre e espere o chef do seu estabelecimento aprovar sua conta!
            </span>
          </Fragment>
        }
        action1={
          <Fragment>
            <span className="home-text58">Mão na massa</span>
          </Fragment>
        }
      ></SugestaoCadastro>
      <Equipe
        member4={
          <Fragment>
            <span className="home-text59">Andress Colega</span>
          </Fragment>
        }
        member4Content={
          <Fragment>
            <span className="home-text60">
              Chef Miguel Costa&apos;s attention to detail and artistic vision elevate our dishes to not only taste amazing but also look stunning.
            </span>
          </Fragment>
        }
        member2Job={
          <Fragment>
            <span className="home-text61">Sous Chef</span>
          </Fragment>
        }
        member1={
          <Fragment>
            <span className="home-text62">Bruno</span>
          </Fragment>
        }
        heading1={
          <Fragment>
            <span className="home-text63">Conheça Nosso Time</span>
          </Fragment>
        }
        content1={
          <Fragment>
            <span className="home-text64">Join Our Team Today!</span>
          </Fragment>
        }
        member1Job={
          <Fragment>
            <span className="home-text65">Head Chef and Founder</span>
          </Fragment>
        }
        member4Job={
          <Fragment>
            <span className="home-text66">Food Stylist</span>
          </Fragment>
        }
        member3Job={
          <Fragment>
            <span className="home-text67">Pastry Chef</span>
          </Fragment>
        }
        member3={
          <Fragment>
            <span className="home-text68">Hahaydgi</span>
          </Fragment>
        }
        actionContent={
          <Fragment>
            <span className="home-text69">Open positions</span>
          </Fragment>
        }
        member2={
          <Fragment>
            <span className="home-text70">João</span>
          </Fragment>
        }
        member3Content={
          <Fragment>
            <span className="home-text71">
              Specializing in desserts and baked goods, Chef Ana Oliveira adds a sweet touch to our team with her delectable creations.
            </span>
          </Fragment>
        }
        member1Content={
          <Fragment>
            <span className="home-text72">
              With over 15 years of experience in the culinary industry, Chef Maria Silva is passionate about creating innovative and delicious recipes that inspire others to cook.
            </span>
          </Fragment>
        }
        content2={
          <Fragment>
            <span className="home-text73">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </span>
          </Fragment>
        }
        member2Content={
          <Fragment>
            <span className="home-text74">
              Chef Carlos Santos brings a creative flair to the kitchen with his expertise in fusion cuisine and dedication to perfecting every dish.
            </span>
          </Fragment>
        }
      ></Equipe>
      <Footer
        termsLink={
          <Fragment>
            <span className="home-text75">Terms of Use</span>
          </Fragment>
        }
        cookiesLink={
          <Fragment>
            <span className="home-text76">Cookies Policy</span>
          </Fragment>
        }
        privacyLink={
          <Fragment>
            <span className="home-text77">Privacy Policy</span>
          </Fragment>
        }
      ></Footer>
    </div>
  );
};

export default Home;