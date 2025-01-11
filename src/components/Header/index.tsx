import { HeaderContainer } from "./styles";

import logoPomodoro from '../../assets/Logo.svg'
import { Scroll, Timer } from "phosphor-react";
import { NavLink } from "react-router-dom";

export function Header(){
    return (
        <HeaderContainer>
            <img src={logoPomodoro} alt="" />
            <nav>
                <NavLink to="/" title="Timer">
                    <Timer size={24} />
                </NavLink>
                <NavLink to="/history" title="Histórico">
                    <Scroll size={24} />
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}