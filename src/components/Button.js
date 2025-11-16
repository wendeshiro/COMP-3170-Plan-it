import styled, { css } from "styled-components";

export const Button = styled.button`
    flex-shrink: 0;
    font-family: Outfit;
    padding: 1rem 1rem;
    background: transparent;
    cursor: pointer;
    border: transparent;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    ${(props) =>
        props.redSmall &&
        css`
            width: 7.8125rem;
            height: 3.5rem;
            border-radius: 1.25rem;
            font-size: 1.25rem;
            font-style: normal;
            background: #bb342f;
            color: #f7f4f0;
        `}

    ${(props) =>
        props.redLarge &&
        css`
            width: 12.1875rem;
            height: 3.9375rem;
            border-radius: 2.375rem;
            font-size: 1.5rem;
            background: #bb342f;
            color: #f7f4f0;
        `}

        ${(props) =>
        props.$whiteSmall &&
        css`
            width: 7.8125rem;
            height: 3.5rem;
            border-radius: 1.25rem;
            font-size: 20px;
            font-style: normal;
            background: #f7f4f0;
            color: #1e1e24;
        `}

        ${(props) =>
        props.blueLarge &&
        css`
            width: 11.4375rem;
            height: 4.8125rem;
            flex-shrink: 0;
            border-radius: 1.25rem;
            background: #4062bb;
            color: #f7f4f0;
            font-size: 1.5625rem;
            font-style: normal;
            font-weight: 700;
            line-height: 1.8125rem;
        `}

        ${(props) =>
        props.whiteLarge &&
        css`
            width: 11.4375rem;
            height: 4.8125rem;
            border-radius: 1.25rem;
            background: #f7f4f0;
            color: #1e1e24;
            font-size: 1.5625rem;
            font-style: normal;
            font-weight: 700;
            line-height: 1.8125rem;
        `}

        ${(props) =>
        props.$addPlan &&
        css`
            width: 15.875rem;
            height: 4.375rem;
            border-radius: 3.5rem;
            background: #4062bb;
            color: #f7f4f0;
            font-size: 1.5rem;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        `}

        ${(props) =>
        props.$savePlan &&
        css`
            width: 7.8125rem;
            height: 3.5rem;
            border-radius: 1.25rem;
            font-size: 20px;
            font-style: normal;
            background: #4062bb;
            color: #f7f4f0;
        `}

        &:hover {
        border: none;
    }
`;
