import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

// Animation for the rotation animation
const rotate = keyframes`
  from{
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs((props) => ({
  // Here is possible to take the passed values and define some for the
  // styled component
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-right: 0;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  // Conditional style for the submit button
  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style-type: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    // Verify if there is a li tag before the current one and aplly the
    // styles
    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #7159c1;
      text-decoration: none;
    }

    div {
      button {
        background-color: transparent;
        border: none;
        margin-left: 5px;
      }
    }
  }
`;
/*
  // The original tag type is specified after the point
  export const Title = styled.h1`
    color: #fff;
    // With the styled components you can change the styles on the fly with the
    // passed values from the props; It means, we can have conditional styles inside the
    // "style sheet"
    // color: ${(props) => (props.error ? 'red' : '#7159c1')};
  `;
*/
