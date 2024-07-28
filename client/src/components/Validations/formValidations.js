const validation = (userData) => {
    const errors = {}

    const REGEX_NAME = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]*$/

    const notSymbolMessage = 'It must not have any symbols'
    const emptyMessage = 'It must not be empty'

    if(!REGEX_NAME.test(userData.name.plainForename)) errors.forename = notSymbolMessage
    if(!userData.name.plainForename ) errors.forename = emptyMessage

    if(!REGEX_NAME.test(userData.name.plainSurname)) errors.surname = notSymbolMessage
    if(!userData.name.plainSurname) errors.surname = emptyMessage

    if(!userData.nationality || userData.nationality === 'selectNationality') errors.nationality = 'You must select a nationality'

    if(!userData.dob) errors.dob = 'You must introduce the birthdate'

    if(userData.teamsId.length === 0 || userData.teamsId.includes('selectTeams')) errors.team = 'You must introduce a team'
    
    if(!userData.description) errors.description = 'You must introduce a description'
    
    return errors
}

export default validation