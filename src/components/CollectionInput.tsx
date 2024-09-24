import React, { useState } from 'react';
import { useAppStore } from '@/store.ts/useStore';

export default function CollectionComponent() {
  const [newCollection, setNewCollection] = useState('');
  const { product, setProduct, } = useAppStore();

  const handleKeyCollectionPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddCollection();
    }
  };

  const handleAddCollection = () => {
    if (newCollection.trim() !== '') {
      setProduct({
        ...product,
        collections: [...product.collections, newCollection.trim()],
      });
      setNewCollection('');
    }
  };

  const handleRemoveCollection = (collection: string) => {
    setProduct({
      ...product,
      collections: product.collections.filter((col) => col !== collection),
    });
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col space-y-2">

        <div className="relative flex flex-col space-y-1 border border-[#00000033] rounded-[12px] p-3">
            <label
              htmlFor={"collection"}
            >
              Product Collections
            </label>


            <div className="flex items-center flex-wrap gap-2">
              {/* Display added collections */}
              {product?.collections?.map((collection, index) => (
                <span key={index} className="bg-gray-200 flex flex-row items-center gap-2  text-gray-700 text-[12px] px-4  rounded-full flex items-center space-x-2">
                  {collection}
                  <button
                    type="button"
                    onClick={() => handleRemoveCollection(collection)}
                    className="text-[10px] flex items-center focus:outline-none h-2"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>

            <input
              type="text"
              placeholder="Search or create collection"
              name="collection"
              value={newCollection && newCollection}
              onChange={(e) => setNewCollection(e.target.value)}
              onKeyPress={handleKeyCollectionPress}
              className={` relative  text-[10px] bg-transparent text-[#00000099] font-bold focus:ring-0 focus:ring-[#00000033] focus:outline-none`}
            />



          {/* Floating label */}

          {/* <button
            onClick={handleAddCollection}
            className="bg-purple text-white px-4 py-2 rounded-[12px]"
          >
            Add
          </button> */}
        </div>
      </div>
    </div>
  );
}
