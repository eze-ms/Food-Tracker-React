import { useMemo } from "react";
import type { Activity } from "../types";
import CalorieDisplay from "./CalorieDisplay";

type CalorieTrackerProps = {
    activities: Activity[];
};

export default function CalorieTracker({ activities }: CalorieTrackerProps) {
    // Contadores
    const { caloriesConsumed, caloriesBurned, netCalories } = useMemo(() => {
        const consumed = activities.reduce((total, activity) => 
            activity.category === 1 ? total + activity.calories : total, 0);

        const burned = activities.reduce((total, activity) => 
            activity.category === 2 ? total + activity.calories : total, 0);

        const net = consumed - burned;

        return { caloriesConsumed: consumed, caloriesBurned: burned, netCalories: net };
    }, [activities]);

    return (
        <>
            <h2 className="text-4xl font-bold text-white text-center">Resumen de Calorías</h2>

            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-5">
                <CalorieDisplay
                    calories={caloriesConsumed}
                    text="Consumidas"
                />
                <CalorieDisplay
                    calories={caloriesBurned}
                    text="Ejercicio"
                />
                <CalorieDisplay
                    calories={netCalories}
                    text="Diferencia"
                />
            </div>
        </>
    );
}
