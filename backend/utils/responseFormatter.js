// Response Formatter Utility
const sendSuccess = (res, data, message = 'Success', statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const sendError = (res, message = 'Error', statusCode = 500, errors = null) => {
  res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
  });
};

const sendPaginatedResponse = (
  res,
  data,
  page,
  limit,
  total,
  message = 'Success'
) => {
  res.status(200).json({
    success: true,
    message,
    data,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
};

module.exports = {
  sendSuccess,
  sendError,
  sendPaginatedResponse,
};
