import styled from "styled-components";

const Wrapper = styled.footer`
    margin-top: 50px;
    padding: 24px;
    color: #aaa;
    background: #010409;
    border-top: 1px solid #333;

    .footerInner {
        display: grid;
        gap: 18px;
    }

    .footerIntro,
    .footerGroups,
    .footerBottom {
        display: flex;
        align-items: center;
    }

    .footerIntro {
        gap: 10px;

        img {
            width: 34px;
            height: 34px;
            object-fit: contain;
            border-radius: 8px;
        }

        div {
            display: grid;
            gap: 2px;
        }

        strong {
            color: #fff;
        }

        span {
            color: #777;
            font-size: 12px;
        }
    }

    .footerText {
        max-width: 620px;
        color: #888;
        line-height: 1.6;
    }

    .footerGroups {
        flex-wrap: wrap;
        gap: 28px;
    }

    .footerGroups > div {
        display: grid;
        gap: 8px;
    }

    .groupTitle {
        color: #ddd;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: .08em;
        text-transform: uppercase;
    }

    .iconLinks {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }

    .iconLinks a {
        display: grid;
        width: 34px;
        height: 34px;
        place-items: center;
        color: #aaa;
        border: 1px solid #333;
        border-radius: 8px;
        transition: color .18s ease, border-color .18s ease, text-shadow .18s ease, box-shadow .18s ease;
    }

    .iconLinks a:hover,
    .footerBottom a:hover {
        color: #fff;
        border-color: #777;
        text-shadow: 0 0 10px rgba(255, 255, 255, .3);
        box-shadow: 0 0 14px rgba(255, 255, 255, .08);
    }

    .footerBottom {
        flex-wrap: wrap;
        gap: 8px;
        padding-top: 14px;
        border-top: 1px solid #222;
        color: #777;
        font-size: 12px;
    }

    .footerBottom a {
        color: #aaa;
        text-decoration: none;
        transition: color .18s ease, text-shadow .18s ease;
    }

    .separator {
        color: #555;
    }

    @media (max-width: 600px) {
        padding: 20px 15px;
    }
`;

export const Styled = { Wrapper };