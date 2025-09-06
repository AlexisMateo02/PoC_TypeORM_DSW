import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const setupDatabase = async () => {
  let connection;

  try {
    console.log('Conectando a MySQL como administrador...');

    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      user: process.env.MYSQL_ROOT_USER,
      password: process.env.MYSQL_ROOT_PASSWORD
    });

    console.log('Conexión establecida');

    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log(`Base de datos "${process.env.DB_NAME}" creada/verificada`);

    await connection.execute(
      `CREATE USER IF NOT EXISTS '${process.env.DB_USER}'@'%' IDENTIFIED BY '${process.env.DB_PASSWORD}'`
    );
    console.log(`Usuario "${process.env.DB_USER}" creado/verificado`);

    await connection.execute(`GRANT ALL ON ${process.env.DB_NAME}.* TO ${process.env.DB_USER}@'%'`);
    console.log(`Permisos otorgados al usuario "${process.env.DB_USER}"`);

    await connection.execute('FLUSH PRIVILEGES');
    console.log('Privilegios actualizados');

    console.log('✅ Configuración de base de datos completada exitosamente');

  } catch (error) {
    console.error('❌ Error configurando la base de datos:');
    console.error(error.message);

    switch (error.code) {
      case 'ER_ACCESS_DENIED_ERROR':
        console.log('\nVerifica que:');
        console.log('   - El usuario y contraseña de root en .env sean correctos');
        console.log('   - MySQL esté ejecutándose');
        break;
      case 'ECONNREFUSED':
        console.log('\nNo se pudo conectar al servidor MySQL:');
        console.log('   - Verifica que MySQL esté ejecutándose');
        console.log(`   - Verifica que el puerto ${process.env.DB_PORT || 3306} esté disponible`);
        console.log('   - Verifica que la dirección del host sea correcta');
        break;
      case 'ER_NOT_SUPPORTED_AUTH_MODE':
        console.log('\nProblema de autenticación:');
        console.log('   - El método de autenticación no es compatible');
        console.log('   - Puede que necesites actualizar la contraseña del usuario usando ALTER USER');
        break;
      default:
        console.log('\nVerifica que:');
        console.log('   - Todas las variables de entorno en .env estén configuradas');
        console.log('   - Tengas los permisos necesarios en MySQL');
        console.log('   - La conexión a la base de datos sea estable');
    }

    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Conexión cerrada');
    }
  }
};

setupDatabase();