import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Barra de rolar personalizada (componente e CSS)
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// Estilo do material UI
import { makeStyles } from "@material-ui/core/styles";

// Componentes Padrão do Material UI
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

//Componentes personalizados
import Tabela from "components/Tabela/Tabela.js";

import routes from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

// Importa imagens para usar como logo
import bgImage from "assets/img/bg2.jpg";
import logo from "assets/img/icon_FAB.png";

//Variável que será usada para inicializar a barra de rolagem personalizada
let ps;

const tableData = [
  { nome: "Alice", idade: 25, profissao: "Engenheira" },
  { nome: "Bob", idade: 30, profissao: "Designer" },
  { nome: "Carol", idade: 35, profissao: "Programadora" },
];

// Renderiza as rotas de forma dinâmica a partir da lista de objetos routes importada do arquivo routes.js
const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/admin" to="admin/simulador" />
  </Switch>
);

// Aplica os estilo do Material UI
const useStyles = makeStyles(styles);

// // Implemente a lógica para atualizar os dados no banco de dados aqui
// const handleUpdate = (newData, oldData) => {
//   // Atualize os dados no banco de dados aqui
// };

// { ...rest } é usado para se trabalhar com um número desconhecido de propriedades passadas como parâmetro
export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image] = React.useState(bgImage);
  const [color] = React.useState("blue");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"Portal DIRINFRA"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />

      

      <div className={classes.mainPanel} ref={mainPanel}>
        {/* Barra de Bavegação */}
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        
        <Tabela tableData={tableData} />

        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
        {getRoute() ? <Footer /> : null}

        {/* Adicione a tabela aqui e passe os dados iniciais e a função handleUpdate */}
        
      </div>
    </div>
  );
}

