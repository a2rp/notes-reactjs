import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = document.getElementById("scroll-root");
        if (node) node.scrollTo({ top: 0, behavior: "auto" });
        else window.scrollTo({ top: 0, behavior: "auto" });
    }, [pathname]);

    useEffect(() => {
        const node = document.getElementById("scroll-root");
        const target = node || window;
        const onScroll = () => setVisible((node ? node.scrollTop : window.scrollY) > 240);
        target.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => target.removeEventListener("scroll", onScroll);
    }, []);

    const handleClick = () => {
        const node = document.getElementById("scroll-root");
        if (node) node.scrollTo({ top: 0, behavior: "smooth" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Button type="button" data-visible={visible} onClick={handleClick} aria-label="Go to top" title="Go to top">
            <FiArrowUp />
        </Button>
    );
}

const Button = styled.button`
    position: fixed;
    right: 22px;
    bottom: 22px;
    z-index: 12000;
    display: grid;
    width: 44px;
    height: 44px;
    place-items: center;
    color: #050505;
    background: #f5f5f5;
    border: 1px solid #444;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transition: opacity .18s ease, border-color .18s ease, box-shadow .18s ease;

    &[data-visible="true"] {
        opacity: 1;
        pointer-events: auto;
    }

    &:hover {
        border-color: #fff;
        box-shadow: 0 0 18px rgba(255, 255, 255, .2);
    }

    @media (max-width: 720px) {
        right: 16px;
        bottom: 16px;
    }
`;