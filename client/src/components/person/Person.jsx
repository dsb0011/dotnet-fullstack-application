import { useEffect, useState } from "react";
import PersonForm from "./PersonForm";
import PersonList from "./PersonList";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_API_URL + "/people";

function Person() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    /* ADDING PEOPLE LIST on the first MOUNT -- GET REQUEST*/
    async function loadPeople() {
      try {
        const res = await fetch(BASE_URL);
        const data = await res.json();
        setPeople(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    loadPeople();
  }, []); // [] It will load only on the first MOUNT!!!

  const defaultFormvalues = {
    id: 0,
    firstName: "",
    lastName: "",
  };

  const methods = useForm({
    defaultValues: defaultFormvalues,
  });

  function handleFormReset() {
    methods.reset(defaultFormvalues);
  }

  const handleFormSubmit = async (person) => {
    try {
      setLoading(true);
      if (!person.id > 0) {
        /* ADDING THE PERSON -- POST REQUEST*/
        const createdPerson = await fetch(BASE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });

        if (!createdPerson.ok) {
          const errorMessage = await createdPerson.text();
          throw new Error(
            `Server Error (${createdPerson.status}): ${errorMessage}`,
          );
        }
        const data = await createdPerson.json();

        console.log("createdPerson", data);
        setPeople((prev) => [...prev, data]);
        toast.success("Successfully Added!");
      } else {
        /* EDITING THE PERSON -- PUT REQUEST*/
        const updatedPerson = await fetch(`${BASE_URL}/${person.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });

        if (!updatedPerson.ok) {
          const errorMessage = await updatedPerson.text();
          throw new Error(
            `Server Error (${updatedPerson.status}): ${errorMessage}`,
          );
        }

        setPeople((prev) => prev.map((p) => (p.id === person.id ? person : p)));
        toast.success("Successfully Edited!");
      }
      methods.reset(defaultFormvalues);
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  function handlePersonEdit(ele) {
    console.log("EDITED", ele);
    setEditData(ele);
  }

  useEffect(() => {
    methods.reset(editData);
  }, [editData]);

  const handlePersonDelete = async (ele) => {
    /* DELETING THE PERSON -- DELETE REQUEST*/
    setLoading(true);
    try {
      if (
        !confirm(
          `Are you sure to delete a person? :${ele.firstName} ${ele.lastName}`,
        )
      )
        return;

      const deletePerson = await fetch(`${BASE_URL}/${ele.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ele.id),
      });

      if (!deletePerson.ok) {
        const errorMessage = await deletePerson.text();
        throw new Error(
          `Server Error (${deletePerson.status}): ${errorMessage}`,
        );
      }

      setPeople((prev) => prev.filter((p) => (p.id === ele.id ? "" : p)));
      toast.success("Successfully Deleted!");
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Demo Form
          </h1>
          {loading && <p>Loading.....</p>}
        </div>

        <PersonForm
          methods={methods}
          onFormReset={handleFormReset}
          onFormSubmit={handleFormSubmit}
        />
        <PersonList
          people={people}
          onPersonDelete={handlePersonDelete}
          onPersonEdit={handlePersonEdit}
        />
      </div>
    </div>
  );
}

export default Person;
