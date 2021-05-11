import Commerce from '@chec/commerce.js'

export const commerce = new Commerce(
    process.env.REACT_APP_CHEC_PUBLIC_KEY,
    true
)

//pk_test_272823917dd17ad69e1a2515b65e3e47a2e802fc9c8e2