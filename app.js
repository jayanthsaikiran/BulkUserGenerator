const admin = require('firebase-admin');
const serviceAccount = require('./serviceKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const createUser = async (user) => {
    try {
        await admin.auth().createUser({
            email: user.email,
            password: user.password
        });
        console.log(`User created: ${user.email}`);
    } catch (error) {
        console.error(`Error creating user ${user.email}: ${error}`);
    }
};


const deleteAllUsers = async () => {
    try {
        let listUsersResult = await admin.auth().listUsers();
        const users = listUsersResult.users;

        if (users.length === 0) {
            console.log('No users to delete.');
            return;
        }

        console.log(`Deleting ${users.length} users...`);

        for (const user of users) {
            await admin.auth().deleteUser(user.uid);
            console.log(`Deleted user: ${user.email}`);
        }

        console.log('All users deleted successfully.');
    } catch (error) {
        console.error('Error deleting users:', error);
    }
};


const createBulkUsers = async () => {
    try {
        const users = require('./users.json');
        for (const user of users) {
            await createUser(user);
        }
        console.log('Bulk user creation completed.');
    } catch (error) {
        console.error('Error creating bulk users:', error);
    }
};

// deleteAllUsers();
createBulkUsers();