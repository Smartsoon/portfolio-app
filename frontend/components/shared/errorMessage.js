const errorMessage = (error) => {
    return (error.graphQLErrors && error.graphQLErrors[0].message) || 'Oops... Something went wrong!'
};

export default errorMessage;
