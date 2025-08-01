// import React from "react";
// import PropTypes from "prop-types";

// const EmptyTable = ({
//   title = "لا توجد بيانات",
//   description = "لا يوجد محتوى في الجدول حالياً.",
//   actionText = "إضافة عنصر جديد",
//   onActionClick,
//   icon = "fa-table",
//   showActionButton = true,
//   customStyles = {}
// }) => {
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "300px", // Adjusted for table context
//         padding: "20px",
//         ...customStyles.container
//       }}
//     >
//       <div
//         style={{
//           textAlign: "center",
//           padding: "2rem 1rem",
//           backgroundColor: "#FFFFFF",
//           borderRadius: "16px",
//           boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
//           border: "1px solid #E0E0E0",
//           maxWidth: "600px",
//           width: "100%",
//           ...customStyles.content
//         }}
//       >
//         <div
//           style={{
//             fontSize: "3rem",
//             color: "#7B51E4",
//             marginBottom: "1rem",
//             ...customStyles.icon
//           }}
//         >
//           <i className={`fas ${icon}`}></i>
//         </div>
//         <h2 style={{ 
//           color: "#1A1A1A", 
//           marginBottom: "0.5rem",
//           ...customStyles.title
//         }}>
//           {title}
//         </h2>
//         {/* <p style={{  */}
//           color: "#666", 
//           marginBottom: "1.5rem",
//           ...customStyles.description
//         }}>
//           {description}
//         </p>
//         {showActionButton && onActionClick && (
//           <button
//             onClick={onActionClick}
//             style={{
//               backgroundColor: "#915EF6",
//               color: "#FFFFFF",
//               border: "none",
//               padding: "0.75rem 1.5rem",
//               borderRadius: "8px",
//               fontWeight: "bold",
//               cursor: "pointer",
//               fontSize: "1rem",
//               ...customStyles.button
//             }}
//           >
//             {actionText}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// EmptyTable.propTypes = {
//   title: PropTypes.string,
//   description: PropTypes.string,
//   actionText: PropTypes.string,
//   onActionClick: PropTypes.func,
//   icon: PropTypes.string,
//   showActionButton: PropTypes.bool,
//   customStyles: PropTypes.shape({
//     container: PropTypes.object,
//     content: PropTypes.object,
//     icon: PropTypes.object,
//     title: PropTypes.object,
//     description: PropTypes.object,
//     button: PropTypes.object
//   })
// };

// export default EmptyTable;