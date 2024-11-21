const createTable = `
CREATE TABLE IF NOT EXISTS product (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_name VARCHAR(255) NOT NULL,
        description VARCHAR(500) NOT NULL,
        price DECIMAL(50, 0) NOT NULL DEFAULT 0.00,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_user VARCHAR(100) NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        updated_user VARCHAR(100)
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

// add new column
// const addColumn = async () => {
//         try {
//           const response = await query(
//             `ALTER TABLE product ADD stock INT DEFAULT 0`
//           );
//           console.log("Column added successfully:", response);
//         } catch (error) {
//           console.error("Error adding column:", error);
//         }
//       };

// change column name from workbench
// ALTER TABLE product
// CHANGE username full_name VARCHAR(255) NOT NULL;

// add new column from workbench
// alter table product
// add is_active Boolean default true

// change type of column from workbench
// Alter table product modify description varchar(500) not null
