export type Candidate = {
    candidatoID: number;
    nombre: string;
    apellidos: string;
    tipoIdentificacion: string;
    numeroIdentificacion: string;
    correoElectronico: string;
    celular: string;
    paisID: number;
    departamentoID: number;
    aspiracionSalarial: number;
    experiencia: string;
    formacionAcademica: string;
    aniosExperiencia: number;
    observaciones: string;
    fechaCreacion: string; // ISO date string
    creadoPor: string;
    ultimaActualizacion: string; // ISO date string
    estado: number;
    seniority: number;
    nivelIngles: number;
    linkHojaDeVida: string;
    fechaNacimiento: string | null;
    sexo: number;
    calificacion: number;
    nivelEstudios: number;
    habilidades: {
        candidatoID: number;
        habilidadID: number;
        habilidad: {
            habilidadID: number;
            nombreHabilidad: string;
            descripcionHabilidad: string;
            fechaCreacion: string;
            creadoPor: string;
            tipoHabilidad: string;
        };
    }[];
    aplicaciones: {
        fechaAplicacion: string;
        estadoAplicacion: string | null;
        experienciaRelevante: string;
        aplicacionCandidatoAVacanteID: number;
        candidatoID: number;
        vacanteID: number;
        observaciones: string;
        contratado: boolean;
        vacante: {
            vacanteID: number;
            titulo: string;
            descripcion: string;
            salarioFijo: number;
            paisID: number;
            departamentoID: number;
            tipoContrato: string;
            fechaPublicacion: string;
            fechaCierre: string;
            empresaID: number;
            seniority: number;
            nivelIngles: number;
            modalidad: number;
            cuposDisponibles: number;
            cuposTotales: number;
            estado: string;
        };
    }[];
    pais: string;
    departamento: {
        id: number;
        CodigoPais: string;
        Pais: string;
        CodigoDepartamento: string;
        Departamento: string;
        CodigoMunicipio: string;
        Municipio: string;
    };
    ciudad: string;
};
