import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { categories } from "../data/categories";
import type { Activity } from "../types";
import { ActivityActions, ActivityState } from '../reducers/activity-reducer';

type FormProps = {
    dispatch: Dispatch<ActivityActions>,
    state: ActivityState
}

const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

export default function Form({ dispatch, state }: FormProps) {

    const [activity, setActivity] = useState<Activity>(initialState);

    useEffect(() => {
        if (state.activeId) {
            const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0];
            if (selectedActivity) {
                setActivity(selectedActivity);
            } else {
                console.warn(`No activity found with id ${state.activeId}`);
            }
        }
    }, [state.activeId, state.activities]);

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setActivity({
            ...activity,
            [id]: id === 'category' || id === 'calories' ? parseInt(value) : value
        });
    }

    const isValidActivity = () => {
        const { name, calories } = activity;
        return name.trim() !== '' && calories > 0;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        dispatch({ type: 'save-activity', payload: { newActivity: activity } });

        setActivity({
            ...initialState,
            id: uuidv4()
        });
    }

    return (
        <form
            action=""
            className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="text-gray-700 text-sm font-bold mb-2">Categoría</label>
                <select
                    name="category"
                    id="category"
                    className="block w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    value={activity.category}
                    onChange={handleChange}
                >
                    <option value="" disabled className="text-gray-500">Selecciona</option>
                    {categories.map((category) => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="text-gray-700 text-sm font-bold mb-2">Actividad</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="block w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Ejemplo: Comida, Zumo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="text-gray-700 text-sm font-bold mb-2">Calorías</label>
                <input
                    type="number"
                    id="calories"
                    name="calories"
                    className="block w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Calorías ej. 300 o 500"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-sm text-white cursor-pointer rounded disabled:opacity-10"
                value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
                disabled={!isValidActivity()}
            />
        </form>
    )
}
