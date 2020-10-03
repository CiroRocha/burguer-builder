/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

const React = require("react")
const { ReduxWrapper } = require('./src/store/ReduxWrapper')

exports.wrapRootElement = ({ element }) => {
  return (
    <ReduxWrapper>
      { element }
    </ReduxWrapper>
  )
}

// * This would be the ideal scenario, but it's not possible to use dispatch inside these functions
// exports.onInitialClientRender = () => {
//   dispatch(authCheckState())
// }

// exports.onClientEntry = () => {
//   dispatch(authCheckState())
// }