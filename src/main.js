import axios from 'axios';

class Api {
    static async getUser(username) {
        try {
        const response = await axios.get(
            `https://api.github.com/users/${username}`
        );
        console.log('response', response);
        } catch (error) {
            console.warn('Erro na requisição: ', error);
        }
    }
}

Api.getUser('alisonbessa');
Api.getUser('aalliissoonnbbeessaa');