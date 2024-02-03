
/** tool to console relevant info */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const printOut = (value: any) => {

    // const toprint = typeof value === 'object' ? value : JSON.stringify(value);
    const toprint = JSON.stringify(value);
  console.log(`
--------------------------------------------------
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    ${toprint}
--------------------------------------------------    
--------------------------------------------------
    `);
};
