import React from 'react';

import { render } from '@testing-library/react-native';

import { Profile } from '../screnns/Profile'

describe('Profile', () => {

    it('check if show correctly user input name placeholde', () => {
        const { getByPlaceholderText } = render(<Profile />);

        const inputName = getByPlaceholderText('Nome');

        expect(inputName).toBeTruthy();
    });

    it('check if user data has been loaded', () => {
        const { getByTestId } = render(<Profile />);

        const inputName = getByTestId('input-name')

        const inputSurName = getByTestId('input-surname')

        expect(inputName.props.value).toEqual('Marcelo');
        expect(inputSurName.props.value).toEqual('Laurentino');

    })

    it('checks if title render correctly', () => {
        const { getByTestId } = render(<Profile />);

        const textTitle = getByTestId('text-title');


        expect(textTitle.props.children).toContain('Perfil');
    })



})

