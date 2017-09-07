import { Permission } from './permission.model';
import { Action } from './action.model';
import { User } from './user.model';
import { Role } from './role.model';
import { Resource } from './resource.model';

export const PERMISSIONS: Permission[] = [
    {
        id_permission: 1,
        resource: 'Módulo Ventas',
        user: 'Yording',
        role: 'Admin'
    },
    {
        id_permission: 2,
        resource: 'Módulo Compras',
        user: 'Yording',
        role: 'Editor'
    },
    {
        id_permission: 3,
        resource: 'Módulo Facturación',
        user: 'Cesar',
        role: 'Admin'
    },
    {
        id_permission: 4,
        resource: 'Vista dashboard',
        user: 'Angela',
        role: 'Restringuido'
    }
];
export const ACTIONS: Action[] = [
    {
        id_action: 1,
        action1: 'Editar',
    },
    {
        id_action: 2,
        action1: 'Crear',
    },
    {
        id_action: 3,
        action1: 'Eliminar',
    },
    {
        id_action: 4,
        action1: 'Consultar',
    }
];
export const ROLES: Role[] = [
    {
        id_role: 1,
        role1: 'Admin',
    },
    {
        id_role: 2,
        role1: 'Editor',
    },
    {
        id_role: 3,
        role1: 'Creador',
    },
    {
        id_role: 4,
        role1: 'Restringuido',
    }
];
export const RESOURCES: Resource[] = [
    {
        id_resource: 1,
        resource1: 'Módulo Ventas',
        parent: '0',
        hereditary: false
    },
    {
        id_resource: 2,
        resource1: 'Módulo Compras',
        parent: '0',
        hereditary: true
    },
    {
        id_resource: 3,
        resource1: 'Módulo Facturación',
        parent: '2',
        hereditary: false
    },
    {
        id_resource: 4,
        resource1: 'Vista dashboard',
        parent: '1',
        hereditary: true
    }
];
export const USERS: User[] = [
    {
        id_user: 1,
        name: 'Yording',
        phone: '3423432',
        email: 'yording@gmail.com'
    },
    {
        id_user: 1,
        name: 'Pedro',
        phone: '3482934',
        email: 'pedro@gmail.com'
    },
    {
        id_user: 1,
        name: 'Angela',
        phone: '74832478233',
        email: 'angela@gmail.com'
    },
    {
        id_user: 1,
        name: 'Carlos',
        phone: '342342',
        email: 'carlos@gmail.com'
    }
];