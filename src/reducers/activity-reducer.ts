import { Activity } from "../types"

/* Definimos el tipo de estado que maneja el reducer. */
export type ActivityActions = 
{   type: 'save-activity', payload:{ newActivity: Activity } } |
{   type: 'set-activeId', payload:{ id: Activity['id'] } } |
{   type: 'delete-activity', payload:{ id: Activity['id'] } } |
{   type: 'restart-activity' } 

/* Definimos el tipo de estado que maneja el reducer. */
export type ActivityState = {
    activities : Activity[],
    activeId: Activity['id']
}
/* Definimos estado inicial de localStorage. */
const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities') 
    return activities ? JSON.parse(activities) : []
}

/* Estado inicial del reducer. */
export const initialState: ActivityState = {
    activities: localStorageActivities(),/* pasamos el estado inicial de localStorage. */
    activeId:'' 
};

/**
 * Reducer para manejar el estado de las actividades.
 * @param state - Estado actual del reducer.
 * @param action - Acción despachada que el reducer manejará.
 * @returns El nuevo estado actualizado.
 */
export const activityReducer = (
        state : ActivityState = initialState,
        action: ActivityActions
    ) => {
    /**
     * Maneja la acción `save-activity` para guardar una nueva actividad.
     * Si hay una `activeId`, actualiza la actividad existente.
     * Si no hay `activeId`, agrega la nueva actividad.
     */
    if(action.type === 'save-activity'){
        //Lógica para actualizar el state 
        let updatedActivities : Activity[] = []
        // Actualiza la actividad existente.
        if(state.activeId){
            updatedActivities = state.activities.map( activity => activity.id === state.activeId ? action.payload.newActivity : activity )
        } else {
            // Agrega la nueva actividad.
            updatedActivities= [...state.activities, action.payload.newActivity]
        }

        return{
            ...state,
            activities: updatedActivities,
            activeId:''   /* Resetea activeId */
        }  
    }

    /**
     * Maneja la acción `set-activeId` para establecer el ID de la actividad activa.
     */
    if(action.type === 'set-activeId') {
        return{
            ...state,
            activeId: action.payload.id
        }
    }

    /**
     * Maneja la acción `delete-activity` para eliminar una actividad por su ID.
     */
    if(action.type === 'delete-activity'){
        return{
            ...state,
            activities: state.activities.filter( activity => activity.id !== action.payload.id )
        }
    }
    
    /**
     * Maneja la acción `restart-activity` para reiniciar las actividades y el ID activo.
     */
    if(action.type === 'restart-activity') {
    
        return{
            activities: [],
            activeId: ''
        }
    }
    return state
}