import React from "react";
import data from './api.json'

export default function BlogPage() {
  console.log(data.data[0].slug)
  return (
    <main className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">blogs</h1>
      <p className="text-gray-600">it is blog page</p>
    </main>
  );
}
