const searchByDocument = (document: number, data: any) => {
    const result = data.find((item: any) => item.document === document)

    if (result === undefined) throw new Error("Estudiante no encontrado")

    return result
}

export default { searchByDocument }