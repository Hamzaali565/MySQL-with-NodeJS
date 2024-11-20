const createTable = `
CREATE TABLE IF NOT EXISTS product (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_name VARCHAR(255) NOT NULL,
        description VARCHAR(500) UNIQUE NOT NULL,
        price DECIMAL(50, 0) NOT NULL DEFAULT 0.00,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_user VARCHAR(100) NOT NULL
)
`;

export { createTable };

/// change column name
// const renameColumns = async () => {
//     try {
//       await query(`ALTER TABLE product CHANGE username full_name VARCHAR(255) NOT NULL`);
//       await query(`ALTER TABLE product CHANGE email user_email VARCHAR(255) UNIQUE NOT NULL`);
//       await query(`ALTER TABLE product CHANGE created_user created_by VARCHAR(100) NOT NULL`);
//       console.log('Columns renamed successfully.');
//     } catch (error) {
//       console.error('Error renaming columns:', error.message);
//     }
//   };
