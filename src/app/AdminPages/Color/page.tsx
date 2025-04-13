"use client";

import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import colorModularApi from "../../../config/apiRoutes/colorModularApi";

interface SubModule {
  name: string;
  price: number;
}

interface ColorModular {
  _id: string;
  modularType: number;
  subModules: SubModule[];
}

export default function ColorModularManagementPage() {
  const [modules, setModules] = useState<ColorModular[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentModule, setCurrentModule] = useState<ColorModular | null>(null);
  const [modularType, setModularType] = useState<number>(0);
  const [subModules, setSubModules] = useState<SubModule[]>([
    { name: "", price: 0 },
  ]);

  useEffect(() => {
    void fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const res = await colorModularApi.getColorModularApi();
      setModules(res.data);
    } catch (err) {
      console.error("Failed to fetch color modulars:", err);
    }
  };

  const handleAddSubModule = () => {
    setSubModules([...subModules, { name: "", price: 0 }]);
  };

  const handleSubModuleChange = (
    index: number,
    field: keyof SubModule,
    value: string | number,
  ) => {
    const updated = [...subModules];
    const current = updated[index];

    const newSubModule: SubModule = {
      name: field === "name" ? String(value) : (current?.name ?? ""),
      price: field === "price" ? Number(value) : (current?.price ?? 0),
    };

    updated[index] = newSubModule;
    setSubModules(updated);
  };

  const handleEdit = (module: ColorModular) => {
    setCurrentModule(module);
    setModularType(module.modularType);
    setSubModules(module.subModules);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await colorModularApi.deleteColorModularApi(id);
      await fetchModules();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentModule) {
        await colorModularApi.updateColorModularApi(currentModule._id, {
          modularType,
          subModules,
        });
      } else {
        await colorModularApi.createColorModularApi({
          modularType,
          subModules,
        });
      }
      await fetchModules();
      setIsFormOpen(false);
      setCurrentModule(null);
      setModularType(0);
      setSubModules([{ name: "", price: 0 }]);
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Color Modular Management</h1>
        <button
          onClick={() => {
            setCurrentModule(null);
            setModularType(0);
            setSubModules([{ name: "", price: 0 }]);
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2 text-white hover:bg-pink-700"
        >
          <FaPlus /> Add Color Modular
        </button>
      </div>

      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 rounded-lg border bg-gray-50 p-6"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Modular Type
            </label>
            <input
              type="number"
              value={modularType}
              onChange={(e) => setModularType(Number(e.target.value))}
              required
              className="w-full rounded-md border px-3 py-2 focus:outline-none"
            />
          </div>

          <div className="mb-4 space-y-4">
            {subModules.map((sub, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-4 md:grid-cols-2"
              >
                <input
                  type="text"
                  placeholder="Color Name"
                  value={sub.name}
                  onChange={(e) =>
                    handleSubModuleChange(index, "name", e.target.value)
                  }
                  className="rounded-md border px-3 py-2"
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={sub.price}
                  onChange={(e) =>
                    handleSubModuleChange(index, "price", e.target.value)
                  }
                  className="rounded-md border px-3 py-2"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSubModule}
              className="text-pink-600 hover:underline"
            >
              + Add Color Option
            </button>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="rounded-md border px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-pink-600 px-4 py-2 text-white hover:bg-pink-700"
            >
              {currentModule ? "Update" : "Create"}
            </button>
          </div>
        </form>
      )}

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Modular Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Colors
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {modules.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{item.modularType}</td>
                <td className="space-y-1 px-6 py-4">
                  {item.subModules.map((sm, idx) => (
                    <div key={idx} className="text-sm">
                      {sm.name} - ₹{sm.price}
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-pink-600 hover:text-pink-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
