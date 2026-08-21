import React from "react";
import {useState} from React
export function formulario(){



    return(
        <>
        return (
    <div className="max-w-md p-4 space-y-4">
      <form onSubmit={handleSave} className="flex gap-2">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://exemplo.com"
          required
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Salvar
        </button>
      </form>

      {savedUrl && (
        <p className="text-sm text-gray-600">
          URL Salva: <a href={savedUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">{savedUrl}</a>
        </p>
      )}
    </div>
  );
        </>
    )
}