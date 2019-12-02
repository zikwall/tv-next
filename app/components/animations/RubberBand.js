import React from "react";
import styled, { keyframes } from 'styled-components';
import { rubberBand } from 'react-animations';

const rubberBandAnimation = keyframes`${rubberBand}`;
const RubberBand = styled.div`
        animation: 1s ${rubberBandAnimation};
    `;

export default RubberBand;