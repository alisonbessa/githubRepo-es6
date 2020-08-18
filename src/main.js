const minhaPromise = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve('OK'), 4000);
    });

    minhaPromise().then((response) => {
        console.log('response', response);
    }).catch((error) => {
        console.log('error', error);
    })

async function executaPromise() {
    const response = await minhaPromise();
    console.log('response async', response);
}
executaPromise();

const executaPromise2 = async () => {
    console.log('response async 2', await minhaPromise());
    console.log('response async 3', await minhaPromise());
    console.log('response async 4', await minhaPromise());
}

executaPromise2();
