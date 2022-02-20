import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);

  const defaultError = {
    //Ako imamo statusCode u controlleru (throw new CustomAPIError) onda se on pokazuje err.statusCode
    //👇👇👇👇👇
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,

    //Ako imamo error u controlleru (throw new CustomAPIError) onda se on pokazuje err.message, ako ne, onda Something went...
    //👇👇👇👇👇
    msg: err.message || 'Something went wrong, try again later',
  };

  if (err.name === 'ValidationError') {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    // defaultError.msg = err.message;

    //👇 Objekat koji dobijamo kao error, iteriramo objektom i objekat pretvaramo u array 👇
    defaultError.msg = Object.values(err.errors)
      .map(item => item.message)
      .join(',');

    //☝☝☝☝☝☝☝☝☝☝☝
  }

  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`;
  }

  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;
