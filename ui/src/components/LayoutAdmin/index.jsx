import React from "react";

import { Grid } from "./styles";

import MainHeaderAdmin from "../MainHeaderAdmin";
import AsideAdmin from "../AsideAdmin";
import ContentAdmin from "../ContentAdmin";



const Layout = ({children}) => { 
    return (
        <Grid>
            <MainHeaderAdmin />
            <AsideAdmin />
            <ContentAdmin>
                {children}
            </ContentAdmin>
        </Grid>
    );
}

export default Layout;