import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module';

// Features modules
import { LocacionModule } from './features/locacion/locacion.module';
import { CentroFormacionModule } from './features/centro-formacion/centro-formacion.module';
import { SedesModule } from './features/sedes/sedes.module';
import { AreasModule } from './features/areas/areas.module';
import { ProgramasModule } from './features/programas/programas.module';
import { AmbientesModule } from './features/ambientes/ambientes.module';
import { FichasModule } from './features/fichas/fichas.module';
import { BodegasModule } from './features/bodega/bodega.module';
import { MaterialesModule } from './features/materiales/materiales.module';

// Security modules
import { PermisosModule } from './features/permisos/permisos.module';
import { CargoModule } from './features/cargo/cargo.module';
import { RolesModule } from './features/roles/roles.module';
import { RolPermisosModule } from './features/rol-permisos/rol-permisos.module';
import { UsuariosModule } from './features/usuarios/usuarios.module';

// Operations modules
import { MovimientosModule } from './features/movimientos/movimientos.module';
import { UnidadMedidaModule } from './features/unidad-medida/unidad-medida.module';
import { AuthModule } from './features/auth/auth.module';

@Module({
  imports: [
    // Global configuration and database
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,

    // Features
    LocacionModule,
    CentroFormacionModule,
    SedesModule,
    AreasModule,
    ProgramasModule,
    AmbientesModule,
    FichasModule,
    BodegasModule,
    MaterialesModule,

    // Security
    PermisosModule,
    CargoModule,
    RolesModule,
    RolPermisosModule,
    UsuariosModule,
    AuthModule,


    // Operations
    MovimientosModule,
    UnidadMedidaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
