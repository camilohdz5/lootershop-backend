import { Response } from "express";

// Standard Good Response
export const OK = (
  res: Response,
  payload: Object,
  message?: String
): Response => {
  return res.status(200).json({
    messsage: message,
    payload: payload,
    isError: false,
    timeStamp: new Date().toString(),
  });
};

// Content Created
export const CREATED = (
  res: Response,
  payload: Object,
  message?: String
): Response => {
  return res.status(201).json({
    messsage: message,
    payload: payload,
    isError: false,
    timeStamp: new Date().toString(),
  });
};

// Request Accepted
export const ACCEPTED = (
  res: Response,
  payload: Object,
  message?: String
): Response => {
  return res.status(202).json({
    messsage: message,
    payload: payload,
    isError: false,
    timeStamp: new Date().toString(),
  });
};

// Request sucessfully but we dont have content to show (for content updates)
export const NO_CONTENT = (
  res: Response,
  payload: Object,
  message?: String
): Response => {
  return res.status(204).json({
    messsage: message,
    payload: payload,
    isError: false,
    timeStamp: new Date().toString(),
  });
};

// A part of the content requested (use for pagination)
export const PARTIAL_CONTENT = (
  res: Response,
  payload: Object,
  message?: String
): Response => {
  return res.status(206).json({
    messsage: message,
    payload: payload,
    isError: false,
    timeStamp: new Date().toString(),
  });
};

// Fail by Bad Syntax on the Request
export const BAD_REQUEST = (
  res: Response,
  payload: Object,
  message?: String
): Response => {
  return res.status(400).json({
    messsage: message,
    payload: payload,
    isError: true,
    timeStamp: new Date().toString(),
  });
};

// Unauthorized requests
export const UNAUTHORIZED = (
  res: Response,
  payload: Object,
  message?: String
): Response => {
  return res.status(401).json({
    messsage: message,
    payload: payload,
    isError: true,
    timeStamp: new Date().toString(),
  });
};

// Forbidden content, authenticating will not make difference
export const FORBIDDEN = (
  res: Response,
  payload: Object,
  message?: String
): Response => {
  return res.status(403).json({
    messsage: message,
    payload: payload,
    isError: true,
    timeStamp: new Date().toString(),
  });
};

// Can not find the content
export const NOT_FOUND = (
  res: Response,
  payload: Object,
  message?: String
): Response => {
  return res.status(404).json({
    messsage: message,
    payload: payload,
    isError: true,
    timeStamp: new Date().toString(),
  });
};

// We can not accept this request
export const NOT_ACCEPTABLE = (
  res: Response,
  payload: Object,
  message?: String
): Response => {
  return res.status(406).json({
    messsage: message,
    payload: payload,
    isError: true,
    timeStamp: new Date().toString(),
  });
};

// server time out (waiting response)
export const TIME_OUT = (
  res: Response,
  payload: Object,
  message?: String
): Response => {
  return res.status(408).json({
    messsage: message,
    payload: payload,
    isError: true,
    timeStamp: new Date().toString(),
  });
};

// Problems in the Server (catching error on backend)
export const INTERNAL_ERROR = (
  res: Response,
  payload: Object,
  message?: String
): Response => {
  return res.status(500).json({
    messsage: message,
    payload: payload,
    isError: true,
    timeStamp: new Date().toString(),
  });
};

// Service unavailable for overloads or maintenance (Temporal state)
export const SERVICE_UNAVAILABLE = (
  res: Response,
  payload: Object,
  message?: String
): Response => {
  return res.status(503).json({
    messsage: message,
    payload: payload,
    isError: false,
    timeStamp: new Date().toString(),
  });
};
