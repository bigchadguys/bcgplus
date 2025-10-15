#ifdef MULTICOLORED_BLOCKLIGHT
    #define OLD_SSBL_ERROR
#endif

#ifdef MC_ANISOTROPIC_FILTERING
    #define OPTIFINE_AF_ERROR
#endif

#if COLORED_LIGHTING > 0 && !defined IS_IRIS
    #define OPTIFINE_ACT_ERROR
#endif

#if COLORED_LIGHTING > 0 && defined MC_OS_MAC
    #define APPLE_ACT_ERROR
#endif

#if defined END_PORTAL_BEAM && !defined IS_IRIS
    #define OPTIFINE_PORTAL_BEAM_ERROR
#endif

#if defined END_PORTAL_BEAM && defined MC_OS_MAC
    #define APPLE_PORTAL_BEAM_ERROR
#endif

#if defined DRAGON_DEATH_EFFECT && !defined IS_IRIS
    #define OPTIFINE_DRAGON_DEATH_ERROR
#endif

#if defined DRAGON_DEATH_EFFECT && defined MC_OS_MAC
    #define APPLE_DRAGON_DEATH_ERROR
#endif

#if END_CRYSTAL_VORTEX > 0 && !defined IS_IRIS
    #define OPTIFINE_END_CRYSTAL_ERROR
#endif

#if END_CRYSTAL_VORTEX > 0 && defined MC_OS_MAC
    #define APPLE_END_CRYSTAL_ERROR
#endif

#if COLORED_LIGHTING_INTERNAL > 0
    #define COORDINATES_ACT_ERROR
    #define SHADOWDISTANCE_ACT_ERROR
#endif

#if (MCBL_MAIN_DEFINE >= 1 || defined SSBL_OVERRIDE) && MC_VERSION < 11604 && !(defined IS_IRIS || defined IS_ANGELICA)
    #define OLD_VERSION_SSBL_ERROR
#endif

#ifdef NEW_EUPHORIA_PATCHES_UPDATE
    #include "/lib/textRendering/new_Euphoria_Version.glsl"
#endif

#ifdef COLOR_CODED_PROGRAMS
    #include "/lib/textRendering/color_code_info.glsl"
#endif

#if COLORED_LIGHTING > 0 && SHADOW_QUALITY < 0
    #define ACT_SHADOW_ERROR
#endif

#if WORLD_SPACE_REFLECTIONS > 0 && COLORED_LIGHTING == 0
    #define WSR_MISSING_ACT_ERROR
#endif

#ifdef OLD_VERSION_SSBL_ERROR
    #include "/lib/textRendering/old_version_ssbl_error.glsl"
#elif defined OLD_SSBL_ERROR
    #include "/lib/textRendering/old_ssbl_error.glsl"
#elif defined OPTIFINE_AF_ERROR
    #include "/lib/textRendering/error_optifine_af.glsl"
#elif defined APPLE_ACT_ERROR
    #include "/lib/textRendering/error_apple_act.glsl"
#elif defined WSR_MISSING_ACT_ERROR
    #include "/lib/textRendering/error_wsr_missing_act.glsl"
#elif defined OPTIFINE_ACT_ERROR
    #include "/lib/textRendering/error_optifine_act.glsl"
#elif defined APPLE_PORTAL_BEAM_ERROR
    #include "/lib/textRendering/error_apple_portal_beam.glsl"
#elif defined OPTIFINE_PORTAL_BEAM_ERROR
    #include "/lib/textRendering/error_optifine_portal_beam.glsl"
#elif defined APPLE_DRAGON_DEATH_ERROR
    #include "/lib/textRendering/error_apple_dragon_death.glsl"
#elif defined OPTIFINE_DRAGON_DEATH_ERROR
    #include "/lib/textRendering/error_optifine_dragon_death.glsl"
#elif defined APPLE_END_CRYSTAL_ERROR
    #include "/lib/textRendering/error_apple_end_crystal.glsl"
#elif defined OPTIFINE_END_CRYSTAL_ERROR
    #include "/lib/textRendering/error_optifine_end_crystal.glsl"
#elif defined ACT_SHADOW_ERROR
    #include "/lib/textRendering/error_shadows_act.glsl"
#else
    #if defined COORDINATES_ACT_ERROR && !defined ACT_DISTANCE_WARNING_OVERRIDE
        ivec2 absCameraPositionIntXZ = abs(cameraPositionInt.xz);
        if (max(absCameraPositionIntXZ.x, absCameraPositionIntXZ.y) > 8388550) {
            #include "/lib/textRendering/error_coordinates_act.glsl"
        }
    #endif
    #ifdef SHADOWDISTANCE_ACT_ERROR
        if (COLORED_LIGHTING_INTERNAL > shadowDistance*2) {
            #include "/lib/textRendering/error_shadowdistance_act.glsl"
        }
    #endif
#endif