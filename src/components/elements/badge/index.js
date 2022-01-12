import React from "react";

export default function Badge({ content }) {
  return <div className="absolute -top-2 -right-2 rounded-full w-6 h-6 bg-gray-100 opacity-90 flex items-center justify-center">{content}</div>;
}
